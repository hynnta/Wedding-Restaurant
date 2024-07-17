from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from .paginators import NhaHangTiecCuoiPaginator
from rest_framework import viewsets, generics, permissions, status
from .perms import ReportOwnerPerms
from .serializers import (
    LoaiSanhSerializer, SanhSerializer,
    MenuSerializer, UserSerializer,
    DichVuSerializer, TiecCuoiSerializer, CreateReportSerializer, TiecCuoiDetailSerializer, ReportSerializer,
    HoaDonSerializer, ChiTietHoaDonSerializer
)
from .models import LoaiSanh, Sanh, Menu, User, DichVu, TiecCuoi, Report, HoaDon, ChiTietHoaDon


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, ]

    def get_permissions(self):
        if self.action in ['current-user']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], url_path="current-user", detail=False)
    def current_user(self, request):
        return Response(self.serializer_class(request.user, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description='Lấy tiệc cưới từ user',
        responses={
            status.HTTP_200_OK: TiecCuoiSerializer()
        }
    )
    @action(methods=['get'], detail=True, url_path='tieccuois')
    def get_tieccuois(self, request, pk):
        tieccuois = User.objects.get(pk=pk).tieccuois.filter(active=True)

        kw = request.query_params.get('kw')
        if kw:
            tieccuois = tieccuois.filter(ten__icontains=kw)

        return Response(data=TiecCuoiSerializer(tieccuois, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class LoaiSanhViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = LoaiSanh.objects.filter(active=True)
    serializer_class = LoaiSanhSerializer

    def get_queryset(self):
        q = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            q = q.filter(ten__icontains=kw)

        return q


class SanhViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Sanh.objects.filter(active=True)
    serializer_class = SanhSerializer
    pagination_class = NhaHangTiecCuoiPaginator

    def get_queryset(self):
        queryset = self.queryset

        kw = self.request.query_params.get("kw")
        if kw:
            queryset = queryset.filter(ten__icontains=kw)

        loai_id = self.request.query_params.get("loai_id")
        if loai_id:
            queryset = queryset.filter(loai_id=loai_id)

        return queryset


class MenuViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Menu.objects.filter(active=True)
    serializer_class = MenuSerializer
    pagination_class = NhaHangTiecCuoiPaginator


class DichVuViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = DichVu.objects.filter(active=True)
    serializer_class = DichVuSerializer
    pagination_class = NhaHangTiecCuoiPaginator

    def get_queryset(self):
        q = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            q = q.filter(ten__icontains=kw)

        return q


class TiecCuoiDetailViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = TiecCuoi.objects.filter(active=True)
    serializer_class = TiecCuoiDetailSerializer

    def get_permissions(self):
        if self.action == 'retrieve':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @swagger_auto_schema(
        operation_description='Get the reports of a lesson',
        responses={
            status.HTTP_200_OK: ReportSerializer()
        }
    )
    @action(methods=['get'], url_path='reports', detail=True)
    def get_reports(self, request, pk):
        tieccuoi = self.get_object()
        reports = tieccuoi.reports.select_related('user').filter(active=True)

        return Response(ReportSerializer(reports, many=True).data,
                        status=status.HTTP_200_OK)


class TiecCuoiViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.RetrieveAPIView):
    queryset = TiecCuoi.objects.filter(active=True)
    serializer_class = TiecCuoiSerializer

    def get_permissions(self):
        if self.action == 'retrieve':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    def get_queryset(self):
        q = self.queryset

        sanh_id = self.request.query_params.get('sanh_id')
        if sanh_id:
            q = q.filter(sanh_id=sanh_id)

        ngay_to_chuc = self.request.query_params.get('ngay_to_chuc')
        if ngay_to_chuc:
            q = q.filter(ngay_to_chuc=ngay_to_chuc)

        return q


class ReportViewSet(viewsets.ViewSet, generics.CreateAPIView,
                     generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Report.objects.filter(active=True)
    serializer_class = CreateReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['update', 'destroy']:
            return [ReportOwnerPerms()]

        return [permissions.IsAuthenticated()]


class HoaDonViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = HoaDon.objects.filter(active=True)
    serializer_class = HoaDonSerializer


class ChiTietHoaDonViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = ChiTietHoaDon.objects.filter(active=True)
    serializer_class = ChiTietHoaDonSerializer
