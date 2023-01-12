import React from "react";
import { Auth } from "aws-amplify";
const CustomSignIn = () => {
  return (
    <div>
      <div className="mx-auto w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="username"
            >
              ユーザー名
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              key="username"
              name="username"
              type="text"
              placeholder="ユーザー名を入力"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              パスワード
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              key="password"
              name="password"
              type="password"
              placeholder="******************"
            />
            <p className="text-grey-dark text-xs">
              パスワードをお忘れですか？{" "}
              <a className="text-indigo cursor-pointer hover:text-indigo-darker">
                パスワードをリセット
              </a>
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              ログイン
            </button>
            <p className="text-grey-dark text-xs">
              アカウントが未登録ですか？{" "}
              <a className="text-indigo cursor-pointer hover:text-indigo-darker">
                アカウントを作成
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomSignIn;
