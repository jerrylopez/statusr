import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import ServiceStatus from './ServiceStatus'

import css from '../styles/components/serviceList.scss'

const ServiceList = (props) => (
    <div className={css.section}>
        <h2 className={css.sectionTitle}>Services</h2>
        
        <ul className={css.services}>
            {props.statusr.service.labels.map((service) => (
                <li className={css.service}>
                    <span className={css.serviceName}>{service}</span>
                    <ServiceStatus statusr={props.statusr} service={service} />
                </li>
            ))}
        </ul>
    </div>
)

export default ServiceList
