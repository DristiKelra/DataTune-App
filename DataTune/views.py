# views.py
from rest_framework import generics
from rest_framework.response import Response
from .models import UploadedData
from DataTune.api.serializers import YourModelSerializer


class HandleMissingValuesView(generics.UpdateAPIView):
    queryset = UploadedData.objects.all()
    serializer_class = YourModelSerializer

    def put(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()  # Save updated data
        return Response(serializer.data)


# Create your views here.
