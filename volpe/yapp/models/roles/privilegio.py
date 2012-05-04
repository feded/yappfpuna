from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import String, Integer
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.entidad_padre import EntidadPadre
from yapp.models.roles.entidad import EntidadDTO, Entidad


class Privilegio(EntidadBase, Base):
    """Crea una Tabla Entidad con 
        - _nombre: nombre de la entidad
        - _entidad: entidad sobre la cual actua el permiso
        - _entidad_padre: instancia de la entidad sobre la cual actual el permiso
    """
    __tablename__ = "privilegio"
    _nombre = Column(String, nullable=False)
    
    _entidad_id = Column(Integer, ForeignKey('entidad._id'))
    _entidad = relation(Entidad, backref=backref('privilegio_entidad'))
    
    _entidad_padre_id = Column(Integer, ForeignKey('entidad_padre._id'))
    _entidad_padre = relation(EntidadPadre, backref=backref('privilegio_entidadPadre'))
#    _estado = relation(RolEstado, backref=backref('rol'))
    
    def __init__(self, nombre, entidad, entidad_padre):
        self._nombre = nombre;
        self._entidad = entidad;
        self._entidad_padre = entidad_padre

class PrivilegiosDTO:
    """Unidad de transporte para privilegios"""
    def __init__(self, privilegio):
        if (privilegio == None):
            return;
        self._id = privilegio._id
        self._nombre = privilegio._nombre;
        self._entidad = EntidadDTO(privilegio._entidad);
        self._entidad_padre = privilegio._entidad_padre
