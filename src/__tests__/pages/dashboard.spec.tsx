import { fireEvent, render, screen } from "@testing-library/react";
import DashBoard from "../../pages/DashBoard";
import { fetchPostList } from "../../services/PostService";

const navigateMock = vi.fn();
const mockFetcListPostFn = vi.fn(fetchPostList).mockImplementation(async () => {
  return [
    {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
    {
      userId: 1,
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    },
    {
      userId: 1,
      id: 3,
      title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    },
    {
      userId: 1,
      id: 4,
      title: "eum et est occaecati",
      body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
    },
    {
      userId: 1,
      id: 5,
      title: "nesciunt quas odio",
      body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
    },
  ];
});
describe("Dashboard", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  vi.mock("react-router-dom", () => {
    return {
      useNavigate() {
        return navigateMock;
      },
    };
  });
  test("should title", async () => {
    render(<DashBoard fetcPostList={mockFetcListPostFn} />);

    const title = await screen.findByRole("heading");
    expect(title).toHaveTextContent("DashBoard");
  });
  test("should render 5 posts in list", async () => {
    render(<DashBoard fetcPostList={mockFetcListPostFn} />);
    const items = await screen.findAllByRole("listitem");

    expect(items).toHaveLength(5);
  });

  test("should click link to back", async () => {
    render(<DashBoard fetcPostList={mockFetcListPostFn} />);
    const link = await screen.findByTestId(2);
    fireEvent.click(link);
    expect(navigateMock).toHaveBeenCalledTimes(1);
  });

  test("should click link to back with text", async () => {
    render(<DashBoard fetcPostList={mockFetcListPostFn} />);
    const link = await screen.findByText(
      /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/
    );
    fireEvent.click(link);
    expect(navigateMock).toHaveBeenCalledTimes(1);
  });
});
