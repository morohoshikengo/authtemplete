import { Amplify, Auth } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import CustomSignIn from './CustomSignIn';
import { useState } from 'react';
Amplify.configure(awsExports);

function App({ signOut}) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const onSignOut = (e) => {
    // フォーム送信を抑止
    e.preventDefault();
    
    Auth.signOut();
    setMessage('');
  }
  const getUserName = async(e) =>{
    // フォーム送信を抑止
    e.preventDefault();

    try { 
      const user = await Auth.currentAuthenticatedUser();
      setMessage(`ユーザー名は${user.username}です`);
    } catch(err) {
      if (err === 'not authenticated') {
        setMessage('サインインしていません');
      } else {
        setMessage('予期しないエラーが発生しました');
        console.error(err);
      }
    }
  }
  const resetForm = (e)  => {
    // フォーム送信を抑止
    e.preventDefault();

    // Form要素を取得
    const form = document.getElementById('signInForm');
    form.reset(); // nullを無視してリセット

    // stateもクリア
    setUserName('');
    setPassword('');
    setMessage('');
  }


  const onSignIn = async (e) => {
    // フォーム送信を抑止
    // Without below, Auth.signIn returns NetworkError.
    e.preventDefault();

    if (username === '') {
      setMessage('ユーザー名が入力されていません');
      return;

    // [Fix]UnexpectedLambdaException:null invocation failed due to configuration.
    } else if (password === '') {
      setMessage('パスワードが入力されていません');
      return;
    } else {
      setMessage('');
    }
    try {
      const user = await Auth.signIn(username, password);

      // ref. https://aws-amplify.github.io/docs/js/authentication#customize-your-own-components
      if (user.challengeName === 'SMS_MFA' ||
        user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        // Do something...
      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        // Do something...
      } else if (user.challengeName === 'MFA_SETUP') {
          // Do something...
      } else {
          setMessage('ログインしました');
          console.log(user);
      }
    } catch (err) {
        if (err.code === 'UserNotConfirmedException') {
            setMessage('ユーザー登録の途中です');
            console.error('UserNotConfirmedException');
        } else if (err.code === 'PasswordResetRequiredException') {
            setMessage('パスワードを変更する必要があります');
            console.error('PasswordResetRequiredException');
        } else if (err.code === 'NotAuthorizedException') {
            setMessage('ユーザー名またはパスワードが異なります');
            console.error('NotAuthorizedException');
        } else if (err.code === 'UserNotFoundException') {
            setMessage('ユーザー名またはパスワードが異なります');
            console.error('UserNotFoundException');
        } else {
            setMessage('予期しないエラーが発生しました');
            console.error(err);
            console.error('Unknowned error');
        }
    }
  }
  // -------------------------------------------------
  //To橋本様
  // 以下_自作のサインアップ関数
  // -------------------------------------------------
  const createUser = async (e) => {
    e.preventDefault();

    if (username === '') {
      setMessage('ユーザー名が入力されていません');
      return;

    // [Fix]UnexpectedLambdaException:null invocation failed due to configuration.
    } else if (password === '') {
      setMessage('パスワードが入力されていません');
      return;
    } else {
      setMessage('');
    }

  
    try {
      const { user } = await Auth.signUp({
          username,
          password,
          attributes: {
              email,          // optional
              phone,   // optional - E.164 number convention
              // other custom attributes 
          },
          autoSignIn: { // optional - enables auto sign in after user is confirmed
              enabled: true,
          }
      });
      console.log(user);
  } catch (error) {
      console.log('error signing up:', error);
  }
  }



  return (
    <div>
      <h3>{message}</h3>
      <form id="signInForm">
        UserName:<input type="text" onChange={(e) => setUserName(e.target.value)}/><br/>
        Password:<input type="password" onChange={(e) => setPassword(e.target.value)} /><br/>
        Email:<input type="email" onChange={(e) => setEmail(e.target.value)} /><br/>
        phone:<input type="phone" onChange={(e) => setPhone(e.target.value)} /><br/>
        <button onClick={(e) => onSignIn(e)}>Sign In</button>
        <button onClick={(e) => resetForm(e)}>Reset</button>
        <button onClick={(e) => onSignOut(e)}>Sign Out</button>
        <button onClick={(e) => getUserName(e)}>Get UserName</button>
        <button onClick={(e) => createUser(e)}>create user</button>
      </form>
    </div>
  );
}

export default (App);