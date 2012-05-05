'''
Created on May 3, 2012

@author: arturo
'''
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.entidad_padre import EntidadPadreDTO, EntidadPadre
from yapp.models.roles.privilegio import Privilegio, PrivilegioDTO
from yapp.models.roles.rol import Rol, RolDTO


class RolPrivilegio (EntidadBase, Base):
    """Crea una Tabla RolPrivilegio que asocia un rol con un privilegio
    """
    __tablename__ = "rol_privilegio"
    
    _rol_id = Column(Integer, ForeignKey('rol._id'), primary_key=True)
    _rol = relation(Rol, backref=backref('rolPrivilegio_rol'))
    
    _privilegio_id = Column(Integer, ForeignKey('privilegio._id'), primary_key=True)
    _privilegio = relation(Privilegio, backref=backref('rolPrivilegio_privilegio'))
    
    _entidad_padre_id = Column(Integer, ForeignKey('entidad_padre._id'))
    _entidad_padre = relation(EntidadPadre, backref=backref('rolPrivilegio_entidad'))
    
    def __init__(self, rol, privilegio, entidad_padre):
        self._rol = rol
        self._privilegio = privilegio
        self._entidad_padre = entidad_padre
        
class RolPrivilegioDTO:
    def __init__(self, rol_privilegio):
        self._id = rol_privilegio._id
        self._rol = RolDTO(rol_privilegio._rol)
        self._privilegio = PrivilegioDTO(rol_privilegio._privilegio)
        self._entidad_padre = EntidadPadreDTO(rol_privilegio._entidad_padre)
    
