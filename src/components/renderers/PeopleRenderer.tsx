import Moment from "react-moment";
import IPerson from "../../interfaces/IPerson";

export function PeopleRenderer (props: IPerson) {
    const { firstName, lastName, birthday, eyeColor } = props;

    return (
        <div className="col-12 p-3">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">{firstName} {lastName}</h3>
                    <ul>
                        <li>Has <b>{eyeColor} eyes</b></li>
                        <li>
                            Birthday: <b><Moment date={birthday} format="YYYY/MM/DD"/></b>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}