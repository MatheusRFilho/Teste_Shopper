import './NavBar.css';

const NavBar = ({ activeItem }) => {
  return (
    <div className="nav-bar">
      <div>
        {activeItem === 'produtos' ? (
          <a className="linkActive" href="/">
            Produtos
          </a>
        ) : (
          <a className="link" href="/">
            Produtos
          </a>
        )}
      </div>
      <div>
        {activeItem === 'pacotes' ? (
          <a className="linkActive" href="/pacotes">
            Pacotes
          </a>
        ) : (
          <a className="link" href="/pacotes">
            Pacotes
          </a>
        )}
      </div>
    </div>
  );
};

export default NavBar;
