import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Search extends Component {
    render() {
        return (
            <div>
                <form method="post">
                    <div class="input-group">

                        <input autocomplete="off" type="text" id="searchKeywords"
                            class="form-control js-destination js-launchModal tt-input"
                            name="term" tabindex="1" placeholder="Where do you want to go?"
                            spellcheck="false" dir="auto"
                            width="100"
                            aria-activedescendant="" aria-owns="searchKeywords_listbox" role="combobox" aria-readonly="true" aria-autocomplete="list" />
                        <div>
                            <input type="text" id="stab-searchbox-start-date" class="form-control js-startDate" name="from-date" tabindex="2" placeholder="Arrive" readonly="true" />
                            <i class="icon-calendar form-control-icon" aria-hidden="true"></i>
                            <label class="sr-only" for="stab-searchbox-start-date">Arrive</label>
                        </div>
                        <div>
                            <input type="text" id="stab-searchbox-start-date" class="form-control js-startDate" name="from-date" tabindex="2" placeholder="Depart" readonly="true" />
                            <i class="icon-calendar form-control-icon" aria-hidden="true"></i>
                            <label class="sr-only" for="stab-searchbox-start-date">Depart</label>
                        </div>
                        <div>
                            <input readonly="true" autocomplete="off" type="text" class="form-control js-guestSelectorInput" tabindex="4" placeholder="Guests" data-original-title="" title="" aria-describedby="popover438678" />
                        </div>
                        <div>
                            <button class="btn btn-primary btn-lg searchbox-submit js-searchSubmit" data-effect="ripple" type="button" tabindex="5" data-loading-animation="true">
                                Search</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
