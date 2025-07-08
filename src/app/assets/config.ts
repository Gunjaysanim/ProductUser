// {
//     "apiServer": {
//       "url": "https://localhost:7198/gateway",
//       "version": "v1"
//     }
// }
interface Config {
  apiServer: {
    url: string;
  };
}

export const configurl: Config = {
  apiServer: {
    url: 'https://localhost:7198/gateway'  // ✅ Your API Gateway or API base
  }
};