import React from 'react';
import {ProgressBar, Card, Badge} from 'react-bootstrap';

const Statusbar = ({ statusData, progressbarColor }) => {
  const getStatusWidth = (statusType, statusKey) => {
    const total =
      statusData[statusType].TBD +
      statusData[statusType].DONE +
      statusData[statusType].WORK +
      statusData[statusType].ERR;
    return total === 0 ? 0 : Math.round((statusData[statusType][statusKey] / total) * 100);
  };

  const getStatusLabel = (statusType, statusKey) => {    
    return statusData[statusType][statusKey] || 0;
  };

  return (
    <Card id="progressbarContainer" className="position-fixed top-10% p-2" style={{width: '18rem', border: "3px solid #e30074", right: "25px"}}>
      {['RECA_STATUS', 'CPY1_STATUS', 'CPY2_STATUS'].map((statusType) => (
        <div key={statusType} className={`status-group bg-light bg-gradient p-2 rounded ${statusType === 'CPY2_STATUS' ? 'mb-0' : 'mb-2'}`}>
          <div className="status-label mb-2 text-start">
            <span className="fw-bold">{statusType.replace('_', ' ')}</span>
            <div className="d-flex flex-row justify-content-between">
                <Badge style={{ fontSize: '10px' }} bg={progressbarColor('TBD ')}>TBD: {getStatusLabel(statusType, 'TBD')}</Badge>
                <Badge style={{ fontSize: '10px' }} bg={progressbarColor('DONE')}>DONE: {getStatusLabel(statusType, 'DONE')}</Badge>
                <Badge style={{ fontSize: '10px' }} bg={progressbarColor('WORK')}>WORK: {getStatusLabel(statusType, 'WORK')}</Badge>
                <Badge style={{ fontSize: '10px' }} bg={progressbarColor('ERR ')}>ERR: {getStatusLabel(statusType, 'ERR')}</Badge>
            </div>
          </div>
          <ProgressBar className="progress">
            <ProgressBar
              variant={progressbarColor('TBD ')}
              now={getStatusWidth(statusType, 'TBD')}
              key={`${statusType}-TBD`}
            />
            <ProgressBar
              variant={progressbarColor('DONE')}
              now={getStatusWidth(statusType, 'DONE')}
              key={`${statusType}-DONE`}
            />
            <ProgressBar
              variant={progressbarColor('WORK')}
              now={getStatusWidth(statusType, 'WORK')}
              key={`${statusType}-WORK`}
            />
            <ProgressBar
              variant={progressbarColor('ERR ')}
              now={getStatusWidth(statusType, 'ERR')}
              key={`${statusType}-ERR`}
            />
          </ProgressBar>
        </div>
      ))}
    </Card>
  );
};

export default Statusbar;
