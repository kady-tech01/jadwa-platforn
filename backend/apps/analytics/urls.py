# apps/analytics/urls.py
from django.urls import path
from .views import ProjectAnalyticsView

urlpatterns = [
    path('projects/<uuid:project_id>/analytics/', ProjectAnalyticsView.as_view(), name='project-analytics'),
]