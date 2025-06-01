import { render, screen } from "@testing-library/react";
import * as rrd from "react-router-dom";
import CardPost from "../../components/CardPost";
import { fetchPostDetail } from "../../services/PostService";

const mockFn = vi.fn(fetchPostDetail);
const mockFetchPostDetail = mockFn.mockImplementation(async () => {
  return {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  };
});
describe("CardPost", () => {
  vi.mock("react-router-dom", () => {
    return {
      useParams: () => ({
        id: 1,
      }),
      Link: vi.fn().mockImplementation((props) => props.children),
    };
  });
  test("should render title", async () => {
    render(<CardPost fetcPostDetail={mockFetchPostDetail} />);

    const post = await screen.findByText(
      /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/
    );
    expect(post).toBeInTheDocument();
  });
  test("should render link to back", async () => {
    render(<CardPost fetcPostDetail={mockFetchPostDetail} />);
    const link = await screen.findByText("Voltar");
    expect(link).toBeInTheDocument();
  });

  test("should validate params in route", async () => {
    vi.spyOn(rrd, "useParams").mockImplementationOnce(() => ({ id: "0" }));
    render(<CardPost fetcPostDetail={mockFetchPostDetail} />);

    const errorText = await screen.findByText("O id não é válido");
    expect(errorText).toBeInTheDocument();
  });
});
