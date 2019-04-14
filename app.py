from flask import Flask, render_template, request, redirect, session
import util, data_manager

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/', methods=['GET', 'POST'])
def home_page():
    if request.method != 'POST':
        return render_template('index.html')
    planet_name = request.json['planetName']
    planet_id = request.json['planetId']
    user = session['user_id']
    data = [planet_id, planet_name, user]
    data_manager.add_vote_info(data)
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method != 'POST':
        return render_template('registration.html', login=True)
    user = data_manager.get_user(request.form.get('user_name'))
    if user is not None:
        session['user_name'] = request.form['user_name']
        session['user_id'] = user['id']
        is_valid_user = util.verify_password(request.form['password'], user['password'])
        session['is_valid'] = is_valid_user
    return redirect('/')


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method != 'POST':
        return render_template('registration.html', login=False)
    user_name = request.form.get('user_name')
    hashed_password = util.hash_password(request.form.get('password'))
    datas = {
        'user_name': user_name,
        'password': hashed_password,
        'rank': 4
    }
    data_manager.register_user(datas)
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)
