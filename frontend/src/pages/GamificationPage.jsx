import React, { useState, useEffect } from 'react';
import { gamificationService } from '../services/gamificationService';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import {
  Trophy,
  Award,
  Zap,
  Flame,
  Compass,
  CalendarCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  Crown,
  Medal,
  RefreshCw,
  Loader2,
  TrendingUp,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Footprints,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const GamificationPage = () => {
  const [activeTab, setActiveTab] = useState('badges'); // 'badges' | 'leaderboard'
  const [profile, setProfile] = useState(null);
  const [badges, setBadges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      const [profData, badgesData, lbData] = await Promise.all([
        gamificationService.getMyGamification(),
        gamificationService.getMyBadges(),
        gamificationService.getLeaderboard(),
      ]);

      setProfile(profData);
      setBadges(badgesData || []);
      setLeaderboard(lbData || []);
    } catch (err) {
      console.error('Failed to load gamification data:', err);
      setError('Unable to load gamification achievements and leaderboard.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderBadgeIcon = (iconName, unlocked) => {
    const props = {
      className: `w-6 h-6 ${unlocked ? 'text-amber-500' : 'text-slate-400'}`,
    };

    switch (iconName?.toLowerCase()) {
      case 'footprints':
        return <Footprints {...props} />;
      case 'trophy':
        return <Trophy {...props} />;
      case 'flame':
        return <Flame {...props} />;
      case 'compass':
        return <Compass {...props} />;
      case 'award':
        return <Award {...props} />;
      case 'calendarcheck':
        return <CalendarCheck {...props} />;
      default:
        return <Award {...props} />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
        <p className="text-sm font-medium">Loading achievements & leaderboard...</p>
      </div>
    );
  }

  const currentLevel = profile?.level || 1;
  const currentTotalXp = profile?.totalXp || 0;
  const currentLevelProgressXp = currentTotalXp % 100;
  const xpNeededForNext = 100 - currentLevelProgressXp;
  const nextLevelPercent = Math.min(Math.round((currentLevelProgressXp / 100) * 100), 100);

  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;
  const totalBadgesCount = badges.length;

  const topThree = leaderboard.slice(0, 3);
  const remainingLearners = leaderboard.slice(3);

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Gamification & Leaderboard' }]} />

      {/* Top Header & Profile Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Campus Recognition System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Gamification & Campus Ranks
            </h1>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              Earn XP for correctly answered questions, level up your academic rank title, unlock milestone badges, and climb the university leaderboard.
            </p>
          </div>

          {/* User Profile Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shrink-0 min-w-[280px]">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-300 text-amber-700 flex items-center justify-center font-bold text-lg shadow-sm">
                  L{currentLevel}
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                    Current Title
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {profile?.levelName || 'Novice Explorer'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-500 font-medium">Total XP</div>
                <div className="text-lg font-bold text-amber-600 flex items-center gap-1 justify-end">
                  <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                  {currentTotalXp}
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Progress to Level {currentLevel + 1}</span>
                <span>{currentLevelProgressXp}/100 XP ({xpNeededForNext} to go)</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${nextLevelPercent}%` }}
                />
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                <span>Badges Earned:</span>
              </span>
              <span className="font-bold text-slate-900">
                {unlockedBadgesCount} / {totalBadgesCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-2 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'badges'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Milestone Badges ({unlockedBadgesCount}/{totalBadgesCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'leaderboard'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Campus Leaderboard ({leaderboard.length})</span>
          </button>
        </div>

        <button
          onClick={() => loadData(true)}
          disabled={refreshing}
          className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Refresh rankings"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-indigo-600' : ''}`} />
        </button>
      </div>

      {/* TAB 1: MILESTONE BADGES */}
      {activeTab === 'badges' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Milestone Badges Showcase</span>
            </h3>
            <span className="text-xs text-slate-500">
              {unlockedBadgesCount} of {totalBadgesCount} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => {
              const isUnlocked = badge.unlocked;

              return (
                <div
                  key={badge.id || badge.code}
                  className={`rounded-xl border p-5 transition-all shadow-sm flex flex-col justify-between ${
                    isUnlocked
                      ? 'bg-white border-amber-300 hover:border-amber-400'
                      : 'bg-slate-50/70 border-slate-200 opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isUnlocked
                            ? 'bg-amber-100 border border-amber-300 shadow-sm'
                            : 'bg-slate-200 border border-slate-300'
                        }`}
                      >
                        {renderBadgeIcon(badge.icon, isUnlocked)}
                      </div>

                      {isUnlocked ? (
                        <Badge variant="warning" size="xs">
                          <CheckCircle2 className="w-3 h-3 text-amber-600" />
                          Unlocked
                        </Badge>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                          <Lock className="w-3 h-3 text-slate-400" />
                          Locked
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      {badge.name}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {badge.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Criteria: {badge.criteria || 'Complete quiz requirements'}</span>
                    {isUnlocked && badge.unlockedAt && (
                      <span className="text-amber-700 font-medium">Earned</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CAMPUS LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          {/* Top 3 Podium */}
          {topThree.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* 2nd Place */}
              {topThree[1] && (
                <div className="order-2 md:order-1 bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-300 text-slate-600 flex items-center justify-center mx-auto mb-2 font-bold text-base">
                      🥈 2
                    </div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Runner Up</div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1 truncate">
                      {topThree[1].email}
                    </h4>
                    <p className="text-xs text-indigo-600 font-medium mt-0.5">
                      Level {topThree[1].level} • {topThree[1].levelName}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-sm font-bold text-slate-800">
                    {topThree[1].totalXp} XP
                  </div>
                </div>
              )}

              {/* 1st Place */}
              {topThree[0] && (
                <div className="order-1 md:order-2 bg-gradient-to-b from-amber-50 to-white border-2 border-amber-300 rounded-xl p-6 text-center shadow-md flex flex-col justify-between relative -mt-2">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Campus Leader
                  </div>
                  <div>
                    <div className="w-14 h-14 rounded-full bg-amber-100 border-2 border-amber-400 text-amber-700 flex items-center justify-center mx-auto mb-2 font-bold text-xl shadow-sm">
                      🥇 1
                    </div>
                    <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Top Scholar</div>
                    <h4 className="text-base font-bold text-slate-900 mt-1 truncate">
                      {topThree[0].email}
                    </h4>
                    <p className="text-xs text-amber-700 font-semibold mt-0.5">
                      Level {topThree[0].level} • {topThree[0].levelName}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-100 text-base font-black text-amber-700 flex items-center justify-center gap-1">
                    <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>{topThree[0].totalXp} XP</span>
                  </div>
                </div>
              )}

              {/* 3rd Place */}
              {topThree[2] && (
                <div className="order-3 bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mx-auto mb-2 font-bold text-base">
                      🥉 3
                    </div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">3rd Place</div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1 truncate">
                      {topThree[2].email}
                    </h4>
                    <p className="text-xs text-indigo-600 font-medium mt-0.5">
                      Level {topThree[2].level} • {topThree[2].levelName}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-sm font-bold text-slate-800">
                    {topThree[2].totalXp} XP
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Full Leaderboard Table */}
          <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Full Leaderboard Rankings</span>
              </h3>
              <span className="text-xs text-slate-500">
                Sorted by Total Verified XP
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Level</th>
                    <th className="py-3 px-4 text-right">Total XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leaderboard.map((student, idx) => {
                    const isTopThree = idx < 3;
                    return (
                      <tr
                        key={student.id || student.email || idx}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          idx === 0 ? 'bg-amber-50/30' : ''
                        }`}
                      >
                        <td className="py-3 px-4 font-bold">
                          <span
                            className={`w-6 h-6 rounded-md inline-flex items-center justify-center text-xs ${
                              idx === 0
                                ? 'bg-amber-100 text-amber-800 font-black'
                                : idx === 1
                                ? 'bg-slate-200 text-slate-700 font-bold'
                                : idx === 2
                                ? 'bg-amber-100/60 text-amber-700 font-bold'
                                : 'text-slate-500'
                            }`}
                          >
                            #{idx + 1}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800 truncate max-w-[200px]">
                          {student.email}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {student.levelName || 'Novice Explorer'}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold text-[11px] border border-indigo-200">
                            Lvl {student.level}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-slate-900">
                          {student.totalXp} XP
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
