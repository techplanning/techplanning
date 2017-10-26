function textScroll(scroll_el_id) 
{
    this.objElement = document.getElementById(scroll_el_id);
    this.objElement.style.position = 'relative';
    this.objElement.style.overflow = 'hidden';
    this.objElement.style.display = '';

    this.objLi = this.objElement.getElementsByTagName('li');
    this.height = 20; //this.objElement.offsetHeight; // li ������Ʈ�� �����̴� ����(�ܺο��� ���氡��)
    this.num = this.objLi.length; // li ������Ʈ�� �� ����
    this.totalHeight = this.height*this.num; // �� ����
    this.scrollspeed = 2; // ��ũ�ѵǴ� px
    this.objTop = new Array(); // �� li�� top ��ġ�� ����
    this.timer = null;
    
    for(var i=0; i<this.num; i++)
    {
        this.objLi[i].style.position = 'absolute';
        this.objTop[i] = this.height*i;
        this.objLi[i].style.top = this.objTop[i]+"px";
    }
};

textScroll.prototype.move = function()
{
    for(var i=0; i<this.num; i++) 
    {
        this.objTop[i] = this.objTop[i] - this.scrollspeed;
        this.objLi[i].style.top = this.objTop[i] + "px";
    }
    
    if(this.objTop[0]%this.height == 0)
    {
        this.jump();
    }
    else
    {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.name+".move()",50);
    }
};

textScroll.prototype.jump = function()
{
    for(var i=0; i<this.num; i++)
    {
        if(this.objTop[i] == this.height*(-2))
        {
            this.objTop[i] = this.objTop[i] + this.totalHeight;
            this.objLi[i].style.top = this.objTop[i] + "px";
        }
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(this.name+".move()",2000);
};

textScroll.prototype.start = function() 
{
    this.timer = setTimeout(this.name+".move()",2000);
};
