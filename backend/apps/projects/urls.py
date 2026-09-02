from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FeasibilityProjectViewSet,
    CapexItemViewSet,
    OpexItemViewSet,
    RevenueStreamViewSet
)

router = DefaultRouter()
router.register(r'projects', FeasibilityProjectViewSet, basename='project')
router.register(r'capex', CapexItemViewSet, basename='capex')
router.register(r'opex', OpexItemViewSet, basename='opex')
router.register(r'revenue', RevenueStreamViewSet, basename='revenue')

urlpatterns = [
    path('', include(router.urls)),
]