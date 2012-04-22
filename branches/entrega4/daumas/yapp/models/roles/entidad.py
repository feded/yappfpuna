from sqlalchemy.schema import Column
from sqlalchemy.types import String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase

class Entidad(EntidadBase, Base):
    """Crea una Tabla Entidad con 
        - _nombre: nombre de la entidad
    B{Esta tabla representa todas las posibles entidades del sistema}"""
    __tablename__ = "entidad"
    _nombre = Column(String, nullable=False)
    def __init__(self, nombre):
        self._nombre = nombre;
