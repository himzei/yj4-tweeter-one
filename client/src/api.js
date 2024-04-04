const BASE_URL = process.env.REACT_APP_BASE_URL;

// 회원가입
export async function apiPostRegister(data) {
  try {
    return await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}
// 로그인
export async function apiPostLogin(data) {
  try {
    return await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}
// 로그인 성공 세션유지
export async function apiGetSession() {
  try {
    return await fetch(`${BASE_URL}/users/login/success`, {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}
// 카카오로그인
export async function apiKakaoLogin(props) {
  const { code } = props.queryKey[1];
  try {
    return await fetch(`${BASE_URL}/users/socials/kakao?code=${code}`, {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}
// 로그아웃
export async function apiPostLogout() {
  try {
    return await fetch(`${BASE_URL}/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}

// 트윗 글쓰기
export async function apiPostTweetCreate({ formData, file }) {
  try {
    const data = new FormData();
    data.append("formData", formData.content);
    data.append("file", file);
    return await fetch(`${BASE_URL}/tweets/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
      body: data,
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}

// 트윗 읽기
export async function apiGetTweetRead() {
  try {
    return await fetch(`${BASE_URL}/tweets`).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}

// 코멘트 작성하기
export async function apiPostCommentCreate({ data, tweetId }) {
  try {
    return await fetch(`${BASE_URL}/tweets/${tweetId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}

// 프로필 페이지 트윗 가져오기
export async function apiGetProfileTweet(props) {
  const { userId } = props.queryKey[1];
  try {
    return await fetch(`${BASE_URL}/tweets/${userId}/profile`).then((res) =>
      res.json()
    );
  } catch (error) {
    console.log(error);
  }
}
