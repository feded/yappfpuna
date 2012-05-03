from sqlalchemy import Column, String, Integer
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.fase.fase import Fase
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relation, backref

class AtributoFase (Base, EntidadBase):

    __tablename__ = "atributofase"
    _nombre = Column(String, nullable = False)
    _descripcion = Column(String, nullable = False) #Ver si va a poder ser null
    _valor = Column(String, nullable = False)       #Ver si va a poder ser null
    _fase_id = Column(Integer, ForeignKey('fase._id'))
    _fase = relation(Fase, backref=backref('fase'))

    def __init__(self, nombre, fase, descripcion, valor):
        self._nombre = nombre;
        self._fase = fase;
        self._descripcion = descripcion;
        self._valor = valor;