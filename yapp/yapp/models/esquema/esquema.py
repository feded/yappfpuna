from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import ForeignKey
from yapp.models.entidad_padre import EntidadPadre
from yapp.models.fase.fase import Fase


class Esquema(EntidadPadre):
    """Crea una la tabla esquema con
        - _nombre: nombre del esquema
        - _descripcion : descripcion del esquema
        - _etiqueta: etiqueda del esquema
        - _color: color para identificar al esquema
        - _fase_id: relacion con la fase sobre la que se crea el esquema
    """
    __tablename__ = "esquema"
    __mapper_args__ = {'polymorphic_identity': 'esquema'}
    _id = Column(Integer, ForeignKey('entidad_padre._id'), primary_key=True)
    _nombre = Column(String, nullable=False)
    _descripcion = Column(String, nullable=False)
    _etiqueta = Column(String, nullable=False)
    _color = Column(String, nullable=False)
    _fase_id = Column(Integer, ForeignKey('fase._id'))
    _fase = relation(Fase, backref=backref('esquema_fase'), primaryjoin=Fase._id==_fase_id)


    def __init__(self, nombre, descripcion, etiqueta, color, fase_id):
        self._nombre = nombre
        self._descripcion = descripcion
        self._etiqueta = etiqueta
        self._color = color
        self._fase_id = fase_id
