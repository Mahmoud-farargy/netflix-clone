import React from "react";
import PropTypes from "prop-types";
import {baseImgURL} from "../../../Config/TMDB";
import {truncateText} from "../../../Utilities/TruncateText";

const Item = (props) => {
    const {item, index, handleDeletingListItem, type, profileIndex} = props;
    const onDeleteItem = () => {
        handleDeletingListItem({type, profileIndex ,itemId: item?.id, index});
    }
    return  (
        <>
        <li id="watchNFavsItem" className="flex-row" key={item.id}>
            <h2 onClick={() => onDeleteItem()} className="watch--item--del">&times;</h2>
            <div className="watch--item--pic">
                <img loading="lazy" src={`${baseImgURL}${(item?.poster_path || item?.backdrop_path)}`} alt={(item?.title || item?.original_title || item?.name)} />
            </div>
            <div className="watch--item--info flex-column">
                <h3 className="watch--item--title">{(item?.title || item?.original_title || item?.name)}</h3>
                <p className="watch--item--description">{truncateText(item?.overview, 400)}</p>
            </div>
        </li>
        </>
    )
}
Item.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    handleDeletingListItem: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    profileIndex: PropTypes.number.isRequired
}

export default Item;