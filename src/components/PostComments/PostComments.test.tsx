import { fireEvent, render, screen } from "@testing-library/react";
import PostComment from ".";

describe("Teste para o componente PostComment", () => {
  it("teste para renderizar o componente corretamente", () => {
    render(<PostComment />);
    expect(screen.getByText("Comentar")).toBeInTheDocument();
  });

  it("teste para inserir dois comentários", async () => {
    render(<PostComment />);
    const textarea = screen.getByTestId("comment-textarea");
    const submitButton = screen.getByTestId("comment-submit-button");

    fireEvent.change(textarea, {
      target: { value: "adicionando primeiro comentário" },
    });
    fireEvent.click(submitButton);
    fireEvent.change(textarea, {
      target: { value: "adicionando segundo comentário" },
    });
    fireEvent.click(submitButton);

    const commentElements = await screen.findAllByTestId("comment-content");
    expect(commentElements).toHaveLength(2);
    expect(
      await screen.findByText("adicionando primeiro comentário")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("adicionando segundo comentário")
    ).toBeInTheDocument();
  });
});
