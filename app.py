from flask import Flask, render_template, request, redirect, session
import util

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/')
def home_page():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = data_manager.get_user(request.form.get('user_name'))
        if user is not None:
            session['user_name'] = request.form['user_name']
            session['user_id'] = user['id']
            session['user_rank'] = user['rank']
            is_valid_user = util.verify_password(request.form['password'], user['password'])
            session['is_valid'] = is_valid_user
        return redirect('/list')
    return render_template('add-user.html', login=True)


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')


@app.route("/list")
def list():
    return render_template("list.html")


if __name__ == '__main__':
    app.run()
