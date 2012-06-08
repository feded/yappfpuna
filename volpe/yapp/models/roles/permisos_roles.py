from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import ForeignKey
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.roles.permisos import Permisos, PermisoDTO
from yapp.models.roles.rol import Rol, RolDTO

class PermisosRoles (Base, EntidadBase):
    __tablename__ = "permisos_roles"
    _permiso_id = Column(Integer, ForeignKey('permisos._id'))
    _permiso = relation(Permisos, backref=backref('permiso_rol_permiso'))
    _rol_id = Column(Integer, ForeignKey('rol._id'))
    _rol = relation(Rol, backref=backref('permiso_rol_rol'))
    
    def __init__(self, permiso,rol):
        self._permiso = permiso;
        self._rol = rol;
        
class PermisoRolDTO:
    def __init__(self, permiso_rol):
        self._permiso = PermisoDTO(permiso_rol._permiso);
        self._rol = RolDTO(permiso_rol._rol);
        self._id = permiso_rol._id;