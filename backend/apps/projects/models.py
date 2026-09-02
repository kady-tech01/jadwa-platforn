import uuid
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class FeasibilityProject(models.Model):
    """
    Core Model representing a Financial Feasibility Study Project.
    """
    CURRENCY_CHOICES = [
        ('DZD', 'Algerian Dinar (DZD)'),
        ('USD', 'US Dollar ($)'),
        ('EUR', 'Euro (€)'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    currency = models.CharField(max_length=10, choices=CURRENCY_CHOICES, default='DZD')
    
    # Financial Model Parameters
    project_duration_years = models.PositiveIntegerField(default=5, help_text="Duration of project evaluation in years")
    discount_rate = models.DecimalField(max_digits=5, decimal_places=2, default=10.00, help_text="Discount rate % (WACC/Target Return)")
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=19.00, help_text="Corporate income tax rate %")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.owner.username})"


class CapexItem(models.Model):
    """
    Capital Expenditure (Initial Investment Assets & Setup Costs).
    """
    project = models.ForeignKey(FeasibilityProject, on_delete=models.CASCADE, related_name='capex_items')
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=100, help_text="e.g., Equipment, Real Estate, Working Capital, Licensing")
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    lifespan_years = models.PositiveIntegerField(default=5, help_text="Asset useful life for depreciation calculations")

    def __str__(self):
        return f"{self.description} - {self.amount} {self.project.currency}"


class OpexItem(models.Model):
    """
    Operational Expenditure (Recurring Yearly/Monthly Costs).
    """
    project = models.ForeignKey(FeasibilityProject, on_delete=models.CASCADE, related_name='opex_items')
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=100, help_text="e.g., Salaries, Utilities, Marketing, Maintenance")
    yearly_cost = models.DecimalField(max_digits=15, decimal_places=2)
    growth_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.00, help_text="Annual cost inflation rate %")

    def __str__(self):
        return f"{self.description} - {self.yearly_cost}/yr"


class RevenueStream(models.Model):
    """
    Projected Revenue Streams for the Feasibility Model.
    """
    project = models.ForeignKey(FeasibilityProject, on_delete=models.CASCADE, related_name='revenue_streams')
    description = models.CharField(max_length=255)
    yearly_revenue = models.DecimalField(max_digits=15, decimal_places=2)
    growth_rate = models.DecimalField(max_digits=5, decimal_places=2, default=5.00, help_text="Annual revenue growth rate %")

    def __str__(self):
        return f"{self.description} - {self.yearly_revenue}/yr"