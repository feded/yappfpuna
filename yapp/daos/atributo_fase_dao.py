from yapp.daos.base_dao import BaseDAO
from yapp.models.fase.atributo_fase import AtributoFase

class AtributoFaseDAO(BaseDAO):
    def get_clase(self):
        return AtributoFase