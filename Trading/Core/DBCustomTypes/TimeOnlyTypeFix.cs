using NHibernate.Dialect;
using NHibernate.Engine;
using NHibernate.SqlTypes;
using NHibernate.Type;
using System.Collections;
using System.Data;
using System.Data.Common;

namespace Core.DBCustomTypes
{
    /// <summary>
    /// Custom TimeSpan type that allows us to use comparators like >, <, ==, <=, >= 
    /// </summary>
    [Serializable]
	public partial class TimeOnlyTypeFix : PrimitiveType, IVersionType
	{
		/// <summary>
		/// Default constructor.
		/// </summary>
		public TimeOnlyTypeFix() : base(SqlTypeFactory.GetTime(0))
		{
		}

		/// <summary>
		/// Constructor for specifying a time with a scale. Use <see cref="SqlTypeFactory.GetTime"/>.
		/// </summary>
		/// <param name="sqlType">The sql type to use for the type.</param>
		public TimeOnlyTypeFix(TimeSqlType sqlType) : base(sqlType)
		{
		}

		public override string Name
		{
			get { return "TimeSpanTypeFix"; }
		}

		public override object Get(DbDataReader rs, int index, ISessionImplementor session)
		{
			try
			{
				var value = rs[index];
				if (value is TimeOnly time) //For those dialects where DbType.Time means TimeSpan.
					return time;

				// Todo: investigate if this convert should be made culture invariant, here and in other NHibernate types,
				// such as AbstractDateTimeType and TimeType, or even in all other places doing such converts in NHibernate.
				var dbValue = Convert.ToDateTime(value);
				return dbValue.TimeOfDay;
			}
			catch (Exception ex)
			{
				throw new FormatException(string.Format("Input string '{0}' was not in the correct format.", rs[index]), ex);
			}
		}

		public override object Get(DbDataReader rs, string name, ISessionImplementor session)
		{
			return Get(rs, rs.GetOrdinal(name), session);
		}

		public override void Set(DbCommand st, object value, int index, ISessionImplementor session)
		{
			if (session.Factory.ConnectionProvider.Driver.RequiresTimeSpanForTime)
				st.Parameters[index].Value = value;
			else
			{
				// We need to change parameter type since in our constructor we use TimeSqlType for correct table create command
				st.Parameters[index].DbType = DbType.String;
				st.Parameters[index].Value = ((TimeOnly)value).ToString(@"hh\:mm");
			}
		}

		public override System.Type ReturnedClass
		{
			get { return typeof(TimeSpan); }
		}

		/// <inheritdoc />
		public override string ToLoggableString(object value, ISessionFactoryImplementor factory)
		{
#pragma warning disable CS8603 // Possible null reference return.
            return (value == null) ? null :
				// 6.0 TODO: inline this call.
#pragma warning disable 618
				ToString(value);
#pragma warning restore CS8603 // Possible null reference return.
#pragma warning restore 618
        }

		// Since 5.2
		[Obsolete("This method has no more usages and will be removed in a future version. Override ToLoggableString instead.")]
		public override string ToString(object val)
		{
			return ((TimeSpan)val).Ticks.ToString();
		}

		#region IVersionType Members

		public object Next(object current, ISessionImplementor session)
		{
			return Seed(session);
		}

		public virtual object Seed(ISessionImplementor session)
		{
			return new TimeSpan(DateTime.Now.Ticks);
		}

		// Since 5.2
		[Obsolete("This method has no more usages and will be removed in a future version.")]
		public object StringToObject(string xml)
		{
			return TimeSpan.Parse(xml);
		}

		public IComparer Comparator
		{
			get { return Comparer<TimeSpan>.Default; }
		}

		#endregion

		// 6.0 TODO: rename "xml" parameter as "value": it is not a xml string. The fact it generally comes from a xml
		// attribute value is irrelevant to the method behavior. Replace override keyword by virtual after having
		// removed the obsoleted base.
		/// <inheritdoc cref="IVersionType.FromStringValue"/>
#pragma warning disable 672
		public override object FromStringValue(string xml)
#pragma warning restore 672
		{
			return TimeSpan.Parse(xml);
		}

		public override System.Type PrimitiveClass
		{
			get { return typeof(TimeOnly); }
		}

		public override object DefaultValue
		{
			get { return TimeOnly.MinValue; }
		}

		System.Collections.IComparer IVersionType.Comparator => throw new NotImplementedException();

		public override string ObjectToSQLString(object value, Dialect dialect)
		{
			return '\'' + ((TimeOnly)value).Ticks.ToString() + '\'';
		}

		public Task<object> NextAsync(object current, ISessionImplementor session, CancellationToken cancellationToken)
		{
			return SeedAsync(session, cancellationToken);
		}

		public Task<object> SeedAsync(ISessionImplementor session, CancellationToken cancellationToken)
		{
			if (cancellationToken.IsCancellationRequested)
			{
				return Task.FromCanceled<object>(cancellationToken);
			}
			try
			{
				return Task.FromResult<object>(Seed(session));
			}
			catch (Exception ex)
			{
				return Task.FromException<object>(ex);
			}
		}
	}
}
