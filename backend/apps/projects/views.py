from rest_framework import viewsets, permissions
from .models import FeasibilityProject, CapexItem, OpexItem, RevenueStream
from .serializers import (
    FeasibilityProjectSerializer,
    CapexItemSerializer,
    OpexItemSerializer,
    RevenueStreamSerializer
)


class FeasibilityProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing feasibility study projects.
    """
    serializer_class = FeasibilityProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return FeasibilityProject.objects.filter(owner=self.request.user)
        return FeasibilityProject.objects.none()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CapexItemViewSet(viewsets.ModelViewSet):
    serializer_class = CapexItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return CapexItem.objects.filter(project__owner=self.request.user)


class OpexItemViewSet(viewsets.ModelViewSet):
    serializer_class = OpexItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return OpexItem.objects.filter(project__owner=self.request.user)


class RevenueStreamViewSet(viewsets.ModelViewSet):
    serializer_class = RevenueStreamSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return RevenueStream.objects.filter(project__owner=self.request.user)