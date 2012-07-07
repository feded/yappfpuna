from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import String, Integer, Boolean
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.entidad_padre import EntidadPadre, EntidadPadreDTO
from yapp.models.roles.privilegio import Privilegio, PrivilegioDTO
from yapp.models.roles.rol import Rol


class RolPrivilegio(EntidadBase, Base):
    """Crea una Tabla Entidad con 
        - _nombre: nombre de la entidad
        - _entidad: entidad sobre la cual actua el permiso
        - _entidad_padre: instancia de la entidad sobre la cual actual el permiso
    """
    __tablename__ = "rol_privilegio"
    
    _privilegio_id = Column(Integer, ForeignKey('privilegio._id'))
    _privilegio = relation(Privilegio, backref=backref('privilegio_entidad'))
    _rol_id = Column(Integer, ForeignKey('rol._id'))
    _rol = relation(Rol)
    _permitir = Column(Boolean);
    _entidad_id = Column(Integer, ForeignKey('entidad_padre._id'))
    _entidad = relation(EntidadPadre, backref=backref('privilegio_entidadPadre'))
#    _estado = relation(RolEstado, backref=backref('rol'))
    
    def __init__(self, privilegio, entidad, rol, permitir):
        self._privilegio = privilegio;
        self._entidad = entidad
        self._rol = rol
        self._permitir = permitir

class RolPrivilegioDTO:
    """Unidad de transporte para privilegios"""
    def __init__(self, privilegio):
        if (privilegio == None):
            return;
        self._id = privilegio._id
        self._permitir = privilegio._permitir;
        if (privilegio._privilegio != None):
            self._privilegio = PrivilegioDTO(privilegio._privilegio);
        if (privilegio._entidad != None):
            self._entidad = EntidadPadreDTO(privilegio._entidad)
        if (privilegio._rol != None):
            self._rol = privilegio._rol._id
