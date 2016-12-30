
function _parseRichtext(rtext) {
  return {__html: '<p>' + rtext.split('\n').join('</p><p>') + '</p>' }
}

function _isDefined(x) {
    return !(x === undefined);
}

var options = {
    language: "en"
};

var DateFormat = React.createClass({
    _months: [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    render: function() {
        var ddmmyyyy = this.props.date.split("-");
        var dd = ddmmyyyy[0];
        var mm = ddmmyyyy[1];
        var yyyy = ddmmyyyy[2];
        var month = this._months[parseInt(mm)-1];
        return (<span className="date">{month} {yyyy}</span>);
    }       
});

            
var SocialIcon = React.createClass({
     _mapping: {
        github: "https://phury.github.io/img/glyphicons-social-22-github.png",
        stackoverflow: "https://phury.github.io/img/glyphicons-social-65-stackoverflow.png",
        linkedin: "https://phury.github.io/img/glyphicons-social-18-linked-in.png",
        tumblr: "https://phury.github.io/img/glyphicons-social-9-tumblr.png",
        instagram: "https://phury.github.io/img/glyphicons-social-33-instagram.png"
    },
    
    render: function() {
        var url = this._mapping[this.props.name];
        return (<img src={url} />); 
    }       
});

var SkillBar = React.createClass({
    render: function() {
        return (
            <span>
                <div className="skill">
                    <div className="skill-progress" style={{width: this.props.percentage + '%'}}>
                        <span className="nowrap">{this.props.name}</span> <span className="sr-only">{this.props.percentage}</span>
                    </div>
                </div>
            </span>
        );
    }
});

var ContactInfo = React.createClass({
    render: function() {
        return (
            <section className="contactInfo">
                <h3>Contact</h3>
                <ul>
                    <li>{this.props.contactInfo.phone}</li>
                    <li>{this.props.contactInfo.email}</li>
                </ul>
            </section>
        );
    }
});

var SocialInfo = React.createClass({
    
    getDefaultProps: function() {
        return {
          socialInfo: []
        };
    },
    
    render: function() {
        var elements = this.props.socialInfo.map(function(elt, i) {
            return (<a key={i} href={elt.link}><SocialIcon name={elt.name} />{elt.name}</a>);
        });
        return (
            <section className="socialInfo">
                <h3>Social</h3>
                <nav className="social">
                    {elements}
                </nav>
            </section>
        );
    }
});

var LanguageInfo = React.createClass({
    getDefaultProps: function() {
        return {
          languages: []
        };
    },
    
    render: function() {
        var elements = this.props.languages.map(function(elt, i) {
            return (<li key={i}><SkillBar name={elt.language} percentage={elt.level * 20} /></li>);
        });
        return (
            <section className="language">
                <h3>Language</h3>
                <ul>{elements}</ul>
            </section>
        );
    }
});

var InterestInfo = React.createClass({
    getDefaultProps: function() {
        return {
          interests: []
        };
    },
    
    render: function() {
        var elements = this.props.interests.map(function(elt, i) {
            return (<li key={i}>{elt}</li>);
        });
        return (
            <section className="interests">
                <h3>Interests</h3>
                <ul>{elements}</ul>
            </section>
        );
    }
});

var PersonalInfo = React.createClass({
    getDefaultProps: function() {
        return {
          personalInfo: {
              firstName: "",
              lastName: ""
          }
        };
    },
    
    render: function() {
        return (
            <div className="col-md-3">
                <section className="overview">
                    <img className="avatar" src={this.props.personalInfo.avatar} alt="profile picture" />
                    <h1 className="wow flipInX" data-wow-delay="1s"><nobr>{this.props.personalInfo.firstName}</nobr> <nobr>{this.props.personalInfo.lastName}</nobr></h1>
                    <h2 className="wow flipInX" data-wow-delay="2s">{this.props.personalInfo.role}</h2>
                </section>
                <aside>
                    <ContactInfo contactInfo={this.props.personalInfo} />
                    <SocialInfo socialInfo={this.props.personalInfo.social} />
                    <LanguageInfo languages={this.props.languages} />
                    <InterestInfo interests={this.props.interests} />
                </aside>
            </div>
        );
    }
});

var ExperienceList = React.createClass({
	getDefaultProps: function() {
        return {
          workExperience: []
        };
    },
    
    render: function() {
		var entryList = this.props.workExperience.map(function(elt, i) {
			return (
                <section className="timeline-item" key={i}>
                    <div className="timeline-icon wow bounceInLeft">
                        <DateFormat date={elt.period.from} />
                    </div>
                    <div className="timeline-content wow bounceInRight">
                        <h4><span className="company">{elt.company}</span>, <span className="location">{elt.location}</span> — <span className="role">{elt.role}</span></h4>
                        <p>{elt.detail.en}</p>
                    </div>
                </section>
			); 
		});
		return (
			<section className="experience">
				<h3>Experience</h3>
                <div className="timeline">
				    {entryList}
                </div>
			</section>
		);
	} 
});
        
        
var EducationList = React.createClass({
	getDefaultProps: function() {
        return {
          education: []
        };
    },
    
    render: function() {
		var entryList = this.props.education.map(function(elt, i) {
			return (
                <section key={i}>
                     <h4><span className="institution">{elt.institution}</span> — <span className="degree">{elt.degree}</span></h4>
                     <DateFormat date={elt.period.from} /> — <DateFormat date={elt.period.to} />
                </section>
			); 
		});
		return (
			<section className="education">
				<h3>Education</h3>
				{entryList}
			</section>
		);
	} 
});
        
var SkillList = React.createClass({
	getDefaultProps: function() {
        return {
          skills: []
        };
    },
    
    render: function() {
        var skillsPerRow = 5
		var skillList = this.props.skills.map(function(elt, i) {
            return (
                <li key={i}><SkillBar name={elt.skill} percentage={elt.level * 20} /></li>
            );
		}).reduce(function(r, elt, i) {
            i % skillsPerRow === 0 && r.push([]);
            r[r.length-1].push(elt);
            return r;
        }, []).map(function(r, i) {
            return (
                <div key={i} className="col-md-4"><ul>{r}</ul></div>
            );
        });
		return (
			<section className="skills">
				<h3>Skills</h3>
				<div className="container-fluid">
				    <div className="row">
                        {skillList}
			         </div>
			     </div>
			</section>
		);
	} 
});

var ResumeInfo = React.createClass({
    getDefaultProps: function() {
        return {
            about: {
                en: ""
            },
            objectives: {
                en: ""
            }
        };
    },
    
    render: function() {
        return (
            <div className="col-md-9">
                <section className="about">
                    <h3>About</h3>
                    <p>{this.props.about.en}</p>
                </section>
                <section className="objectives">
                    <h3>Objectives</h3>
                    <p>{this.props.objectives.en}</p>
                </section>
                <ExperienceList workExperience={this.props.workExperience} />
                <SkillList skills={this.props.skills} />
                <EducationList education={this.props.education} />
            </div>
        );
    }
});

var ResumeApp = React.createClass({
    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        this.serverRequest = $.getJSON(this.props.source, function(data) {
            this.setState(data);
        }.bind(this));
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
		return (
			<div className="container-fluid">
				<div className="row">
					<PersonalInfo 
						personalInfo={this.state.personalInfo} 
						languages={this.state.languages}
						interests={this.state.interests} />
					<ResumeInfo
						about={this.state.about}
						objectives={this.state.objectives}
						workExperience={this.state.workExperience}
                        skills={this.state.skills} 
                        education={this.state.education} />
				</div>
			</div>
		);
    }
});


ReactDOM.render(
  <ResumeApp source='/resume/data/resume.json' />,
  document.getElementById('app')
);