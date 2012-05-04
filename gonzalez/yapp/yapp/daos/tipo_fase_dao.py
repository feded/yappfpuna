from yapp.daos.base_dao import BaseDAO
from yapp.models.fase.tipo_fase import TipoFase
class TipoFaseDAO(BaseDAO):
    def get_clase(self):
        return TipoFase