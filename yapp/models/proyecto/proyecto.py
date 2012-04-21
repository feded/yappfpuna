from sqlalchemy.schema import Column
from sqlalchemy.types import String
from sqlalchemy.types import Integer
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase

class Proyecto(EntidadBase, Base):
    __tablename__ = "proyecto"
    _nombre = Column(String, nullable=False)
    _autor = Column(String, nullable=False)
    _prioridad = Column(Integer, nullable=False)
    _estado = Column(String, nullable=False)
    _lider = Column(String, nullable=False)
    _nota = Column(String, nullable=True)
    _fecha_creacion = Column(String, nullable=False)
    _fecha_modificacion= Column(String, nullable=False)
    def __init__(self, nombre, autor, prioridad, estado,lider,nota,fecha_creacion,fecha_modificacion):
        self._nombre = nombre;
        self._autor = autor;
        self._prioridad = prioridad;
        self._estado = estado;
        self._lider = lider;
        self._nota = nota;
        self._fecha_creacion = fecha_creacion;
        self._fecha_modificacion = fecha_modificacion;
