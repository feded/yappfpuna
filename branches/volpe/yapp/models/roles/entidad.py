from sqlalchemy.schema import Column
from sqlalchemy.types import String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase

class Entidad(EntidadBase, Base):
    __tablename__ = "entidad"
    _nombre = Column(String, nullable=False)
    def __init__(self, nombre):
        self._nombre = nombre;
