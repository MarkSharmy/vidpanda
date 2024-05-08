class YouTube:

    @property
    def title(self):
        return self.__title
    
    @property
    def thumbnail_url(self):
        return self.__thumbnail_url
    
    @property
    def url(self):
        return self.__url
    
    def __init__(self, url):
        self.__url = url
        self.__thumbnail_url = "/vidpanda/static/images/maxresdefault.jpg"
        self.__title = "Flutter Master Course"

