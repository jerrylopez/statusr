import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import css from '../styles/components/statusBar.scss'

const MESSAGE_OPERATIONAL = 'All Services Operational'
const MESSAGE_PROBLEM = 'Houston we have problem...'

function StatusBar ({
    data: { loading, error, repository}
}) {
    let status = getStatus(repository.issues)

    return (
        <div>
            <div className={css.section}>
                <div className={[css.status, (status ? css.problem : css.operational)].join(' ')}>
                    <span className={css.message}>{status ? MESSAGE_PROBLEM : MESSAGE_OPERATIONAL}</span>
                </div>
            </div>
        </div>
    )
}

function getStatus (issues) {
    return issues.totalCount ? true : false
}

export const issues = gql`
    query StatusBar {
        repository(owner:"jerrylopez", name:"dus-demo") {
            issues(last:20, states:OPEN){
                totalCount   
            }
        }
    }
`

export default graphql(issues, {
    props: ({ data }) => {
      return ({
        data
      })
    }
})(StatusBar)
