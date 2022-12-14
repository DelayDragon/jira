import { setupServer } from "msw/node";
import { rest } from "msw";
import { http } from "utils/http";

// 配置mock环境

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer();

// beforeAll带包执行所有的测试之前，先来执行一下回调函数
beforeAll(() => server.listen());

// 每一个测试跑完以后，都重置mock路由
afterEach(() => server.resetHandlers());

// 所有的测试跑完后，关闭mock路由
afterAll(() => server.close());

test("http方法发送异步请求", async () => {
  // 请求地址
  const endpoint = "test-endpoint";
  // 返回值
  const mockResult = { mockValue: "mock" };

  // rest就是mock服务端请求接口，得到请求后返回mockResult
  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) =>
      res(ctx.json(mockResult))
    )
  );

  // 测试endpoint接口
  const result = await http(endpoint);
  // 期待返回值是否与mockResult相同
  // 相等：toEqual，严格相等：toBe；
  expect(result).toEqual(mockResult);
});

test("http请求时回在header里带上token", async () => {
  const token = "FAKE_TOKEN";
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  let request: any;

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await http(endpoint, { token });
  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});
