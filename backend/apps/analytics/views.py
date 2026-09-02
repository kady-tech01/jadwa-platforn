from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from apps.projects.models import FeasibilityProject
from .services.cashflow import FinancialEngine
from .services.sensitivity import SensitivityEngine


class ProjectAnalyticsView(APIView):
    """
    API endpoint returning comprehensive Pandas financial analytics for a project.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, project_id):
        try:
            project = FeasibilityProject.objects.get(id=project_id)
        except FeasibilityProject.DoesNotExist:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)

        financial_engine = FinancialEngine(project)
        sensitivity_engine = SensitivityEngine(project)

        metrics = financial_engine.calculate_metrics()
        sensitivity = sensitivity_engine.run_sensitivity_analysis()

        return Response({
            'project_id': project.id,
            'project_title': project.title,
            'currency': project.currency,
            'financial_metrics': metrics,
            'sensitivity_analysis': sensitivity
        }, status=status.HTTP_200_OK)