from sqlalchemy import Column, Integer
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relation, backref
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.fase.fase import Fase
from yapp.models.tipo_item.tipo_item import TipoItem

class TipoFase (Base, EntidadBase):
    """
    @summary: Crea una Tabla Tipo_Fase. Los tipos de items que soporta la fase.  
    @param _fase: fase a la cual se le asocia el tipo de item.
    @param _tipo: tipo de item que soporta la fase.
    """
    __tablename__ = "tipo_fase"
    _fase_id = Column(Integer, ForeignKey('fase._id'))
    _fase = relation(Fase, backref=backref('tipofase_fase'))
    _tipo_id = Column(Integer, ForeignKey('tipo_item._id'))
    _tipo = relation(TipoItem, backref=backref('tipofase_tipo'))

    def __init__(self, fase,tipo):
        self._fase = fase;
        self._tipo = tipo;