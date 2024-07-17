from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import LoaiSanh, Sanh, Menu, User, DichVu, TiecCuoi, Report, HoaDon, ChiTietHoaDon


class LoaiSanhSerializer(ModelSerializer):
    class Meta:
        model = LoaiSanh
        fields = ['id', 'ten', 'gia_sang', 'gia_trua', 'gia_toi', 'gia_cuoi_tuan']


class SanhSerializer(ModelSerializer):
    image = SerializerMethodField(source='image')
    loai = LoaiSanhSerializer()

    def get_image(self, obj):
        request = self.context['request']
        path = '/static/%s' % obj.image.name

        return request.build_absolute_uri(path)

    class Meta:
        model = Sanh
        fields = ["id", "ten", "sl_ban_max", "image", "ghi_chu", "loai"]


class MenuSerializer(ModelSerializer):
    image = SerializerMethodField(source='image')

    def get_image(self, obj):
        request = self.context['request']
        path = '/static/%s' % obj.image.name

        return request.build_absolute_uri(path)

    class Meta:
        model = Menu
        fields = ["id", "ten", "khai_vi", "mon_sup", "mon_chinh1", "mon_chinh2", "mon_chinh3", "trang_mieng", "image"]


class UserSerializer(ModelSerializer):
    avatar_path = SerializerMethodField(source='avatar')

    def get_avatar_path(self, obj):
        request = self.context['request']
        if obj.avatar and not obj.avatar.name.startswith('/static'):
            path = '/static/%s' % obj.avatar.name

            return request.build_absolute_uri(path)

    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.set_password(user.password)
        user.save()

        return user

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'password', 'email',
                  'avatar', 'avatar_path', 'is_customer', 'is_employee']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_customer': {'read_only': True},
            'is_employee': {'read_only': True},
            'avatar_path': {'read_only': True},
            'avatar': {'write_only': True}
        }


class DichVuSerializer(ModelSerializer):
    image = SerializerMethodField(source='image')

    def get_image(self, obj):
        request = self.context['request']
        path = '/static/%s' % obj.image.name

        return request.build_absolute_uri(path)

    class Meta:
        model = DichVu
        fields = ['id', 'ten', 'gia', 'image']

        extra_kwargs = {
            'id': {'read_only': False},
            'image': {'read_only': False},
        }


class TiecCuoiSerializer(ModelSerializer):
    class Meta:
        model = TiecCuoi
        fields = ['id', 'sl_ban', 'menu', 'sanh', 'user', 'dichvus', 'ngay_to_chuc', 'ten_chu_re', 'ten_co_dau']


class TiecCuoiDetailSerializer(TiecCuoiSerializer):
    dichvus = DichVuSerializer(many=True)
    menu = MenuSerializer()
    sanh = SanhSerializer()

    class Meta:
        model = TiecCuoi
        fields = TiecCuoiSerializer.Meta.fields + ['dichvus', 'menu', 'sanh']


class CreateReportSerializer(ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'content', 'created_date', 'updated_date', 'tieccuoi', 'user']


class ReportSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Report
        exclude = ['active']


class HoaDonSerializer(ModelSerializer):
    class Meta:
        model = HoaDon
        fields = ['id', 'ngay_tao', 'user', 'chi_tiet_hoa_don']


class ChiTietHoaDonSerializer(ModelSerializer):
    class Meta:
        model = ChiTietHoaDon
        fields = ['id', 'tieccuoi', 'thanh_tien']



