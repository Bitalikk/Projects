import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import s from './ProfUser.module.css';
import ActiveBets from '../../components/ActiveBets/ActiveBets';
import FinishBets from '../../components/FinishBets/FinishBets';

const ProfUser = ({ session }) => {
  return (
    <div className={s.header}>
      <div className={s.main}>
        <div className={s.first}>
          <img
            className={s.img}
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4ccaf30e-a9ba-40ef-8a47-2e4c840b531e/d7zdt52-2c2db77c-c5c6-43a1-8c84-2aef2dc3f992.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzRjY2FmMzBlLWE5YmEtNDBlZi04YTQ3LTJlNGM4NDBiNTMxZVwvZDd6ZHQ1Mi0yYzJkYjc3Yy1jNWM2LTQzYTEtOGM4NC0yYWVmMmRjM2Y5OTIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.PPbbeIyFMyT3vCOy8av9xg5Qyq9oIgOQNVkBPznmnew"
            alt=""
          />
          <div className={s.info}>
            <div className={s.lineSecond}>@{session.user.userName}</div>
            <div className={s.lineSecond}>Balance: {session.user.points}</div>
            <div>
              <Button type="button" className={s.but}>
                <Link to="/active_games">ADD BET</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className={s.bet}>
          <ActiveBets session={session} />
          <FinishBets />
        </div>
      </div>
    </div>
  );
};

// Подключить коннект, добавить мапСтейт в коннект

const mapStateToProps = state => ({
  session: state.session,
});
// ProfUser.propTypes = {};
export default connect(mapStateToProps)(ProfUser);
