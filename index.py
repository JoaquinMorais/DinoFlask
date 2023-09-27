from app import app

app.config.update(
SECRET_KEY='MyUltraDupaSecretKey'
)



from routes.dino import Dinosaur

app.register_blueprint(Dinosaur)

if __name__ == '__main__':
    app.run(debug=True, port=5000)