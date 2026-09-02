from rest_framework import serializers
from .models import FeasibilityProject, CapexItem, OpexItem, RevenueStream


class CapexItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CapexItem
        fields = ['id', 'description', 'category', 'amount', 'lifespan_years']


class OpexItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpexItem
        fields = ['id', 'description', 'category', 'yearly_cost', 'growth_rate']


class RevenueStreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = RevenueStream
        fields = ['id', 'description', 'yearly_revenue', 'growth_rate']


class FeasibilityProjectSerializer(serializers.ModelSerializer):
    capex_items = CapexItemSerializer(many=True, read_only=True)
    opex_items = OpexItemSerializer(many=True, read_only=True)
    revenue_streams = RevenueStreamSerializer(many=True, read_only=True)
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = FeasibilityProject
        fields = [
            'id', 'owner', 'title', 'description', 'currency',
            'project_duration_years', 'discount_rate', 'tax_rate',
            'capex_items', 'opex_items', 'revenue_streams',
            'created_at', 'updated_at'
        ]