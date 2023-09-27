from flask import Blueprint,render_template,redirect,url_for


Dinosaur = Blueprint("Dinosaur",__name__)
  
@Dinosaur.route("/",methods=['GET'],endpoint = 'home_dino')
def home_dino():
    return render_template('dino_main.html')
        