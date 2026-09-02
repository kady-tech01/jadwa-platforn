from django.contrib import admin
from .models import FeasibilityProject, CapexItem, OpexItem, RevenueStream


class CapexInline(admin.TabularInline):
    model = CapexItem
    extra = 1


class OpexInline(admin.TabularInline):
    model = OpexItem
    extra = 1


class RevenueInline(admin.TabularInline):
    model = RevenueStream
    extra = 1


@admin.register(FeasibilityProject)
class FeasibilityProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'currency', 'project_duration_years', 'discount_rate', 'created_at')
    search_fields = ('title', 'owner__username')
    list_filter = ('currency', 'created_at')
    inlines = [CapexInline, OpexInline, RevenueInline]