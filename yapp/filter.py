class Filter():
    def filter(self , request):
        if 'user' in request.session:
            return True
        else:
            return False
    