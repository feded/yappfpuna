from sqlalchemy.schema import Column
from sqlalchemy.types import String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase

class Privilegio(EntidadBase, Base):
    """Crea una Tabla Entidad con 
        - _nombre: nombre de la entidad
    B{Esta tabla representa todas las posibles entidades del sistema}"""
    __tablename__ = "privilegio"
    _nombre = Column(String, nullable=False)
    def __init__(self, nombre):
        self._nombre = nombre;

class PrivilegioDTO:
    def __init__(self, entidad):
        if (entidad == None):
            return
        self._id = entidad._id
        self._nombre = entidad._nombre