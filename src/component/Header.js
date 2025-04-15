const Header = () => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '80px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <img src="/logo.png" width={30} style={{ margin: '10px' }} />
      <div style={{ padding: '10px', fontSize: '20px' }}>Travo</div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        2박 3일 서울 여행
      </div>
      <button style={{ background: 'none', border: 'none', margin: '10px' }}>
        나의 여행
      </button>
      <button style={{ background: 'none', border: 'none', margin: '10px' }}>
        로그아웃
      </button>
    </div>
  );
};

export default Header;
