// error.ts
export const getErrorMessage = (err: any, callback = "오류가 발생했습니다.") => {
  const backendMessage = err?.reponse?.data?.messagae;
  if(backendMessage) return backendMessage;

  const axiosMsg = err?.messaga;
  if(axiosMsg) return axiosMsg;

  return callback;
}