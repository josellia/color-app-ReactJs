import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getList from "../services/list";
import createColor from "../services/post";
import "./List.css";

toast.configure();
const List = () => {
  const [alert, setAlert] = useState(false);

  const [colorInput, setColorInput] = useState("");
  const [colorDecimalInput, setColorDecimalInput] = useState("");

  const [color, setColor] = useState([]);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (color.length && !alert) {
      return;
    }
    getList().then((color) => {
      if (mounted) {
        setColor(color);
      }
    });
    return () => (mounted.current = false);
  }, [alert, color]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        if (mounted.current) {
          setAlert(false);
        }
      }, 1000);
    }
  }, [alert]);

  const handleName = (e) => {
    setColorInput(e.target.value);
  };
  const handleColorDecimal = (e) => {
    hexa(e.target.value);
    setColorDecimalInput(e.target.value);
  };

  const hexa = (hexa) => {
    hexa = hexa.replace(/[^0-9a-f]/gi, "");
    const isvalidHex = hexa.length === 6 || hexa.length === 3;
    if (!isvalidHex) toast("Erro");
    if (hexa.length === 3) {
      hexa = hexa[0] + hexa[0] + hexa[1] + hexa[1] + hexa[2] + hexa[2];
    }

    return hexa;
  };

  const validateForm = () => {
    if (!colorDecimalInput) {
      toast.warn("Por favor, preencha o decimal da cor");
      return false;
    }
    if (!colorInput) {
      toast.warn("Por favor, preencha o nome da cor");
      return false;
    }

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const validate = validateForm();
    if (!validate) {
      return true;
    }
    createColor(colorInput.toUpperCase(), colorDecimalInput).then(() => {
      if (mounted.current) {
        setColorDecimalInput("");
        setColorInput("");
        setAlert(true);
        toast.success("Cor criada com sucesso");
      }
    });
  };
  return (
    <div className="container-color">
      <h2 className="container-text">Lista de cores decimais</h2>
      {/* {alert && <h3>Cor criada com sucesso</h3>}, */}
      <form onSubmit={handleSubmit} className="form-color">
        <div className="input-item">
          <input
            type="color"
            onChange={handleColorDecimal}
            value={colorDecimalInput}
            className="input-form-color"
          />
        </div>
        <div className="input-item">
          <input
            type="text"
            placeholder="Nome cor"
            onChange={handleName}
            value={colorInput}
            className="input-form"
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
      <ul className="content">
        {color?.map((c) => (
          <li key={c.id}>
            {c.nome} - {c.decimal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
