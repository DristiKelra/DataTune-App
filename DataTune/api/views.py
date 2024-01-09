from rest_framework.viewsets import ModelViewSet
from ..models import UploadedData
from .serializers import YourModelSerializer


class DataViewSet(ModelViewSet):
    queryset = UploadedData.objects.all()
    serializer_class = YourModelSerializer
