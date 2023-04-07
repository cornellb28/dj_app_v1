import React, { useState } from "react";
import Input from './form/Input';
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { selectAllArtists } from "../features/artists/artistsSlice";

function EditTrackMeta() {
    const dispatch = useDispatch();
    // states    
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [bpm, setBpm] = useState('');
    
    // fetch all artists
    const artists = useSelector(selectAllArtists);

    // User selection of artist
    const [selectedOptions, setSelectedOptions] = useState([]);


    // Changes
    const onTitleChanged = e => setTitle(e.target.value);
    const onYearChanged = e => setYear(e.target.value);
    const onBpmChanged = e => setBpm(e.target.value);

    const handleChange = (selected) => {
        setSelectedOptions(selected);
      };
    
      const formatOptions = (options) => {
        return options.map((option) => {
          return { value: option.value, label: option.label };
        });
      };
      const formattedOptions = formatOptions(selectedOptions);

    const onSaveTrackClicked = (e) => {
        e.preventDefault();
        if (title && year && bpm) {
            dispatch(addTracks(title, year, bpm, formattedOptions))
            setYear('')
            setTitle('')
            setBpm('')
            setSelectedOptions([])
        }
    }

    const canSave = Boolean(title) && Boolean(year) && Boolean(bpm);

    const artistsOptions = artists.map(artist => (
        <option key={artist.value} value={artist.label}>
            {artist.label}
        </option>
    ))

    const gradient = "linear-gradient(to right, #000000, #ffffff)";
    return (
        <section className="py-2 w-8/12" style={{ backgroundImage: gradient }}>
            <form onSubmit={onSaveTrackClicked}>
                <div className="form-group">
                    <Input name={'year'} type={'text'} title={'Year'} className={'form-control'} value={year} onChange={onYearChanged} />
                </div>
                <div className="form-group">
                    <label htmlFor="artistTrack">Artist:</label>
                    <Select
                        options={artists}
                        isMulti
                        value={selectedOptions}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <Input name={'title'} type={'text'} title={'Title'} className={'form-control'} value={title} onChange={onTitleChanged} />
                </div>
                <div className="form-group">
                    <Input name={'bpm'} type={'text'} title={'BPM'} className={'form-control'} value={bpm} onChange={onBpmChanged} />
                </div>
                <button className="text-white py-4 px-8 bg-blue-500 hover:bg-blue-700 font-bold" disabled={!canSave}>Save MetaData</button>
            </form>
        </section>
    )
}

export default EditTrackMeta