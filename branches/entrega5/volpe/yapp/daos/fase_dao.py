from yapp.daos.base_dao import BaseDAO
from yapp.models.fase.fase import Fase

class FaseDAO(BaseDAO):
    def get_clase(self):
        return Fase